import { Component, Prop, Vue } from 'vue-property-decorator'

export interface Item {
  id: string
  value: string
  checked: boolean
}

@Component({ name: 'TodoItem' })
export default class extends Vue {
  @Prop(String)
  public value!: string

  @Prop(Boolean)
  public checked!: boolean

  public render() {
    return (
      <li
        class={{
          completed: true,
          editing: false,
        }}
      >
        <div class="view">
          <input class="toggle" type="checkbox" checked={this.checked} />
          <label>{this.value}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value={this.value} />
      </li>
    )
  }
}
