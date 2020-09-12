import { Component, Vue } from 'vue-property-decorator'
import TodoFooter from './components/TodoFooter'
import TodoList from './components/TodoList'
import TodoItem, { Item } from './components/TodoItem'
import TodoHeader from './components/TodoHeader'
import { v4 as uuid } from 'uuid'

@Component({ name: 'App' })
export default class extends Vue {
  public dataSource: Array<Item> = [
    { id: uuid(), value: 'one', checked: true },
    { id: uuid(), value: 'two', checked: false },
    { id: uuid(), value: 'three', checked: false },
  ]

  public render() {
    const options = {
      scopedSlots: {
        default: (item: Item, index: number) => (
          <TodoItem
            id={item.id}
            value={item.value}
            checked={item.checked}
            index={index}
            key={item.id}
          ></TodoItem>
        ),
      },
    }

    return (
      <div>
        <section class="todoapp">
          <TodoHeader></TodoHeader>
          <TodoList dataSource={this.dataSource} {...options}></TodoList>
          <TodoFooter></TodoFooter>
        </section>
        <footer class="info">
          <p>Double-click to edit a todo</p>
          <p>
            Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
          </p>
          <p>
            Created by <a href="http://todomvc.com">you</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    )
  }
}
