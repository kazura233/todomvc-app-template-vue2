import { Component, Prop, Vue } from 'vue-property-decorator'
import { Item } from './TodoItem'

@Component({ name: 'TodoList' })
export default class extends Vue {
  @Prop(Array)
  public dataSource!: Array<Item>

  public render() {
    return (
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul class="todo-list">{this.dataSource.map(this.$scopedSlots.default!)}</ul>
      </section>
    )
  }
}
