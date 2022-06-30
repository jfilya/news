import './sources.css';

interface objKeyString {
    [key: string]: string;
}

class Sources {
    draw(data: Array<objKeyString>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp');
        const pagination: HTMLUListElement = document.querySelector('.pagination');
        const notesOnPage = 10 as number;
        const countOfItem: number = Math.ceil(data.length / notesOnPage);

        for (let i = 1; i <= countOfItem; i++) {
            const li = document.createElement('li') as HTMLElement;
            li.innerText = String(i);
            pagination.append(li);
        }
        const arrowLeft: HTMLDivElement = document.querySelector('.arrow-left');
        const arrowRight: HTMLDivElement = document.querySelector('.arrow-right');
        let indexPage = 0;
        const list: NodeListOf<Element> = document.querySelectorAll('.pagination li');
        showPage(list[0]);
        list.forEach((li) => {
            li.addEventListener('click', (): void => {
                showPage(li);
                indexPage = +li.innerHTML - 1;
            });
        });
        arrowRight.addEventListener('click', () => {
            indexPage += 1;
            if (indexPage > countOfItem - 1) {
                indexPage = countOfItem - 1;
            }
            showPage(list[indexPage]);
        });
        arrowLeft.addEventListener('click', () => {
            indexPage -= 1;
            if (indexPage < 0) {
                indexPage = 0;
            }
            showPage(list[indexPage]);
        });
        function showPage(li: Element): void {
            const active = document.querySelector('.pagination li.active');
            if (active) {
                active.classList.remove('active');
            }
            li.classList.add('active');

            const pageNum: number = +li.innerHTML;
            enum Page {
                start = (pageNum - 1) * notesOnPage,
                end = (pageNum - 1) * notesOnPage + notesOnPage,
            }

            const start: Page = Page.start;
            const end: Page = Page.end;

            const notes: Array<objKeyString> = data.slice(start, end);

            document.querySelector('.sources').innerHTML = '';
            for (const item of notes) {
                const sourceClone: HTMLTemplateElement = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

                sourceClone.querySelector('.source__item-name').textContent = item.name;
                sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);
                fragment.append(sourceClone);
            }
            document.querySelector('.sources').append(fragment);
            if (window.innerWidth <= 783) {
                document.querySelectorAll('.source__item').forEach((btn) =>
                    btn.addEventListener('click', () => {
                        document.querySelector('.news').scrollIntoView({
                            block: 'nearest',
                            behavior: 'smooth',
                        });
                    })
                );
            }
        }
    }
}

export default Sources;
