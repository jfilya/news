import './sources.css';



class Sources {
    draw(data: Array<{[key:string]: string}>):void {
        const fragment:DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        let pagination = document.querySelector('.pagination') as HTMLElement;

        let notesOnPage:number = 10;
        let countOfItem:number = Math.ceil(data.length/notesOnPage)

        for(let i:number = 1; i <= countOfItem; i++){
            let li = document.createElement('li') as HTMLElement
            li.innerText = String(i);
            pagination.append(li)
        }

        let list: NodeListOf<Element> = document.querySelectorAll('.pagination li');
        showPage(list[0]);
        list.forEach(li => {
              li.addEventListener('click', ():void =>{
                showPage(li)
            })
        })
          
        function showPage(li: Element):void{
            let active = document.querySelector('.pagination li.active') as HTMLElement
            if(active){
               active.classList.remove('active') 
            }
            li.classList.add('active')

            let pageNum:number = +li.innerHTML ;
            enum Page {
                start = (pageNum-1)* notesOnPage,
                end = start + notesOnPage,
              }

            let start:Page = Page.start;
            let end:Page = Page.end;
            
            let notes:Array<{[key:string]: string}> = data.slice(start, end)
        
            document.querySelector('.sources').innerHTML = ''
            for(let item of notes){
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
        
                sourceClone.querySelector('.source__item-name').textContent = item.name ;
                sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);
                fragment.append(sourceClone);
            }
            document.querySelector('.sources').append(fragment);
        }
    }
}


export default Sources;
