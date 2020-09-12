/*
 * @Author: kazura233
 * @Date: 2020-09-13 00:52:17
 * @Last Modified by: kazura233
 * @Last Modified time: 2020-09-13 01:02:35
 */

import { ENTER_KEY } from '@/constants'
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'TodoHeader' })
export default class extends Vue {
  public value: string = ''

  public handleKeyDown(event: KeyboardEvent) {
    if (event.keyCode === ENTER_KEY) {
      this.$emit('addItem', this.value.trim())
      this.value = ''
      console.log('addItem')
    }
  }

  public render() {
    return (
      <header class="header">
        <h1>todos</h1>
        <input
          value={this.value}
          onInput={(event: InputEvent) => (this.value = (event.target as HTMLInputElement).value)}
          onKeydown={(event: KeyboardEvent) => this.handleKeyDown(event)}
          class="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
        />
      </header>
    )
  }
}
