import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'TodoHeader' })
export default class extends Vue {
  public render() {
    return (
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autoFocus={true} />
      </header>
    )
  }
}
