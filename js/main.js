import '../scss/main.scss'

const itemList = document.querySelector('.items')
const inputEl = document.querySelector('input')
const addBtn = document.querySelector('.footer__button')
const noItemUI = document.querySelector('.noItemUI')

// 요소를 만들고 속성과 값을 추가해서 리턴하는 함수
function makeNewElementWithClass(htmltag, value) {
  const newElement = document.createElement(htmltag)
  newElement.setAttribute('class', value)
  return newElement
}

function onAdd() {
  // 1. 인풋창에 내용을 입력한다
  const text = inputEl.value
  // 2. 입력한 내용을 리스트 아이템으로 만든다
  const newItem = createItem(text)
  // 3. 입력한 내용을 리스트에 추가한다
  itemList.appendChild(newItem)
  // 4. 아이템을 추가하면 인풋창 초기화, 인풋창 포커스
  inputEl.value = ''
  inputEl.focus()
}

// 쇼핑리스트 아이템을 만들고 리턴하는 함수
function createItem(text) {
  // 각 요소들을 만듦
  const itemRow = makeNewElementWithClass('li', 'item__row')
  const item = makeNewElementWithClass('div', 'item')
  const itemName = makeNewElementWithClass('span', 'item__name')
  itemName.innerText = text
  const icons = makeNewElementWithClass('div', 'item__icons')
  const itemCheck = makeNewElementWithClass('button', 'icon item__check')
  itemCheck.innerHTML = `<i class="fas fa-check"></i>`
  const itemDelete = makeNewElementWithClass('button', 'icon item__delete')
  itemDelete.innerHTML = `<i class="fas fa-trash-alt"></i>`
  const divider = makeNewElementWithClass('div', 'item__divider')
  // 요소들을 DOM Tree 에 맞게 추가해줌
  itemRow.appendChild(item)
  itemRow.appendChild(divider)
  item.appendChild(itemName)
  item.appendChild(icons)
  icons.appendChild(itemCheck)
  icons.appendChild(itemDelete)

  // check 버튼을 누르면 텍스트에 라인 그어지기
  itemCheck.addEventListener('click', () => {
    itemName.classList.toggle('complete')
    itemCheck.classList.toggle('complete')
  })
  // delete 버튼을 누르면 리스트 삭제
  itemDelete.addEventListener('click', () => {
    itemList.removeChild(itemRow)
    // 아이템이 모두 지워지면 기본문구 나타내기
    if (itemList.childElementCount > 1) return
    if (itemList.childElementCount === 1) {
      noItemUI.style.display = 'flex'
    }
  })
  
  return itemRow
}

// + 버튼을 누르면 아이템 추가
addBtn.addEventListener('click', () => {
  if (inputEl.value === '') return
  noItemUI.style.display = 'none'  // 아이템이 추가되면 기본문구 지우기
  onAdd()
})
// Enter 키를 누르면 아이템 추가
inputEl.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') return
  if (inputEl.value === '') return
  noItemUI.style.display = 'none' // 아이템이 추가되면 기본문구 지우기
  onAdd()
})

