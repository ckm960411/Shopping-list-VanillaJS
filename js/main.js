import '../scss/main.scss'

const items = document.querySelector('ul')
const itemList = document.querySelector('.items')
const inputEl = document.querySelector('input')
const addBtn = document.querySelector('.footer__button')
const noItemUI = document.querySelector('.noItemUI')
const form = document.querySelector('.new-form')

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
let id = 0
function createItem(text) {
  // 각 요소들을 만듦
  const itemRow = document.createElement('li')
  itemRow.setAttribute('class', 'item__row')
  itemRow.setAttribute('data-id', id)
  itemRow.innerHTML = `
    <div class="item">
      <span class="item__name" data-checking-id=${id}>${text}</span>
      <div class="item__icons">
        <button class="icon item__check" data-checkBtn=${id}>
          <i class="fas fa-check" area-hidden="true" data-check-id=${id}></i>
        </button>
        <button class="icon item__delete">
          <i class="fas fa-trash-alt" aria-hidden="true" data-target-id=${id}></i>
        </button>
      </div>
    </div>
    <div class="item__divider"></div>
  `
  id++
  
  return itemRow
}

items.addEventListener('click', (event) => {
  // 휴지통 아이콘을 클릭하면 해당 아이템 지우기
  const targetId = event.target.dataset.targetId
  if (targetId) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${targetId}"]`)
    toBeDeleted.remove()
  }
  // 체크 아이콘을 누르면 해당 아이템 줄 긋기
  const checkId = event.target.dataset.checkId
  if (checkId) {
    const toBeChecked = document.querySelector(`.item__name[data-checking-id="${checkId}"]`)
    const checkBtn = document.querySelector(`.icon.item__check[data-checkBtn="${checkId}"]`)
    toBeChecked.classList.toggle('complete')
    checkBtn.classList.toggle('complete')
  }
  // 아이템이 모두 지워지면 기본문구 나타내기
  if (itemList.childElementCount > 1) return
  if (itemList.childElementCount === 1) {
    noItemUI.style.display = 'flex'
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (inputEl.value === '') return
  noItemUI.style.display = 'none' // 새 아이템이 추가되면 기본문구 지우기
  onAdd()
})