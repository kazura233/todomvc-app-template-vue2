/*
 * @Author: kazura233
 * @Date: 2020-09-13 00:52:33
 * @Last Modified by: kazura233
 * @Last Modified time: 2020-09-13 02:45:14
 */

import { Component, Vue, Watch } from 'vue-property-decorator'
import TodoFooter from './components/TodoFooter'
import TodoList from './components/TodoList'
import TodoItem, { Item } from './components/TodoItem'
import TodoHeader from './components/TodoHeader'
import { v4 as uuid } from 'uuid'
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS, STORE_NAMESPACE } from './constants'

const routerMap = new Map([
  ['/', ALL_TODOS],
  ['/active', ACTIVE_TODOS],
  ['/completed', COMPLETED_TODOS],
])

@Component({ name: 'App' })
export default class extends Vue {
  /**
   * 当前页面所展示的类目
   */
  public nowShowing: string = routerMap.get(window.location.hash.slice(1)) || ALL_TODOS

  /**
   * 所有数据
   */
  public dataSource: Array<Item> = JSON.parse(
    localStorage.getItem(STORE_NAMESPACE) || '[]'
  ) as Array<Item>

  /**
   * 当前要展示的数据
   */
  private get shownDataSource() {
    return this.dataSource.filter((item) => {
      switch (this.nowShowing) {
        case ACTIVE_TODOS:
          return !item.checked
        case COMPLETED_TODOS:
          return item.checked
        default:
          return true
      }
    })
  }

  /**
   * 未完成数量
   */
  private get activeCount() {
    return this.dataSource.reduce((count, item) => (item.checked ? count : count + 1), 0)
  }

  /**
   * 数据发生变化，自动保存。
   */
  @Watch('dataSource')
  private dataSourceWatch() {
    localStorage.setItem(STORE_NAMESPACE, JSON.stringify(this.dataSource))
  }

  /**
   * 增加
   * @param value
   */
  public addItem(value: string) {
    this.dataSource = this.dataSource.concat({
      id: uuid(),
      value,
      checked: false,
    })
  }

  /**
   * 更新
   * @param id
   * @param cover
   */
  public changeItem(id: string, cover: Partial<Item>) {
    this.dataSource = this.dataSource.map((item) => (item.id !== id ? item : { ...item, ...cover }))
  }

  /**
   * 保存
   * @param id
   * @param value
   */
  public save(id: string, value: string) {
    this.changeItem(id, { value })
  }

  /**
   * 切换
   * @param id
   * @param checked
   */
  public toggle(id: string, checked: boolean) {
    this.changeItem(id, { checked })
  }

  /**
   * 全部切换
   * @param checked
   */
  public toggleAll(checked: boolean) {
    console.log('toggleAll')
    this.dataSource = this.dataSource.map((item) => ({ ...item, checked }))
  }

  /**
   * 销毁
   * @param id
   */
  public destroy(id: string) {
    this.dataSource = this.dataSource.filter((item) => item.id !== id)
  }

  /**
   * 清除已经完成
   */
  public clearCompleted() {
    this.dataSource = this.dataSource.filter(({ checked }) => !checked)
  }

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
            onSave={this.save}
            onToggle={this.toggle}
            onDestroy={this.destroy}
          ></TodoItem>
        ),
      },
    }

    return (
      <div>
        <section class="todoapp">
          <TodoHeader onAddItem={this.addItem}></TodoHeader>
          <TodoList
            dataSource={this.shownDataSource}
            onToggleAll={this.toggleAll}
            activeCount={this.activeCount}
            {...options}
          ></TodoList>
          <TodoFooter
            nowShowing={this.nowShowing}
            onSetNowShowing={(nowShowing: string) => (this.nowShowing = nowShowing)}
            activeCount={this.activeCount}
            completedCount={this.dataSource.length - this.activeCount}
            onClearCompleted={this.clearCompleted}
          ></TodoFooter>
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
