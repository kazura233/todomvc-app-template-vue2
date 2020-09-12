/*
 * @Author: kazura233
 * @Date: 2020-09-13 00:52:27
 * @Last Modified by: kazura233
 * @Last Modified time: 2020-09-13 02:41:58
 */

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Item } from './TodoItem'

@Component({ name: 'TodoList' })
export default class extends Vue {
  @Prop(Array)
  public dataSource!: Array<Item>

  @Prop(Number)
  public activeCount!: number

  public render() {
    return (
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          checked={this.activeCount === 0}
          onInput={(event: InputEvent) => {
            console.log('toggleAll')
            this.$emit('toggleAll', (event.target as HTMLInputElement).checked)
          }}
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">{this.dataSource.map(this.$scopedSlots.default!)}</ul>
      </section>
    )
  }
}
