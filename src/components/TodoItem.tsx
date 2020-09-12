/*
 * @Author: kazura233
 * @Date: 2020-09-13 00:52:21
 * @Last Modified by: kazura233
 * @Last Modified time: 2020-09-13 01:08:19
 */

import { ENTER_KEY, ESCAPE_KEY } from '@/constants'
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

export interface Item {
  id: string
  value: string
  checked: boolean
}

@Component({ name: 'TodoItem' })
export default class extends Vue {
  @Prop(String)
  public id!: string

  @Prop(String)
  public value!: string

  @Prop(Boolean)
  public checked!: boolean

  @Ref('inputRef')
  public readonly inputRef!: HTMLInputElement

  public localValue: string = ''

  public isEditing: boolean = false

  private mounted() {
    this.localValue = this.value
  }

  public async handleDoubleClick() {
    console.log('dbclick')
    this.isEditing = true
    await this.$nextTick()
    this.inputRef.focus()
    this.inputRef.setSelectionRange(this.localValue.length, this.localValue.length)
  }

  public handleBlur(event: FocusEvent) {
    this.isEditing = false
    this.$emit('save', this.id, this.localValue.trim())
  }

  public handleKeyDown(event: KeyboardEvent) {
    // 退出编辑模式，保存内容
    if (event.keyCode === ENTER_KEY) {
      this.isEditing = false
      this.$emit('save', this.id, this.localValue.trim())
    }
    // 退出编辑模式，回滚内容
    if (event.keyCode === ESCAPE_KEY) {
      this.isEditing = false
      this.localValue = this.value
    }
  }

  public render() {
    return (
      <li
        class={{
          completed: !this.isEditing && this.checked,
          editing: this.isEditing,
        }}
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            checked={this.checked}
            onInput={(event: InputEvent) =>
              this.$emit('toggle', this.id, (event.target as HTMLInputElement).checked)
            }
          />
          <label onDblclick={this.handleDoubleClick}>{this.localValue}</label>
          <button class="destroy" onClick={() => this.$emit('destroy', this.id)}></button>
        </div>
        <input
          class="edit"
          ref="inputRef"
          value={this.localValue}
          onBlur={(event: FocusEvent) => this.handleBlur(event)}
          onInput={(event: InputEvent) =>
            (this.localValue = (event.target as HTMLInputElement).value)
          }
          onKeydown={(event: KeyboardEvent) => this.handleKeyDown(event)}
        />
      </li>
    )
  }
}
