/*
 * @Author: kazura233
 * @Date: 2020-09-13 00:52:14
 * @Last Modified by: kazura233
 * @Last Modified time: 2020-09-13 02:48:55
 */

import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from '@/constants'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'TodoFooter' })
export default class extends Vue {
  @Prop(Number)
  public activeCount!: number

  @Prop(Number)
  public completedCount!: number

  @Prop(String)
  public nowShowing!: string

  public pluralize(word: string, count: number) {
    return word + (count === 1 ? '' : 's')
  }

  public render() {
    return (
      <footer class="footer">
        <span class="todo-count">
          <strong>{this.activeCount}</strong> {this.pluralize('item', this.activeCount)} left
        </span>
        <ul class="filters">
          <li>
            <a
              class={{ selected: this.nowShowing === ALL_TODOS }}
              onClick={() => this.$emit('setNowShowing', ALL_TODOS)}
              href="#/"
            >
              All
            </a>
          </li>
          <li>
            <a
              class={{ selected: this.nowShowing === ACTIVE_TODOS }}
              onClick={() => this.$emit('setNowShowing', ACTIVE_TODOS)}
              href="#/active"
            >
              Active
            </a>
          </li>
          <li>
            <a
              class={{ selected: this.nowShowing === COMPLETED_TODOS }}
              onClick={() => this.$emit('setNowShowing', COMPLETED_TODOS)}
              href="#/completed"
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show={this.completedCount > 0}
          onClick={() => this.$emit('clearCompleted')}
        >
          Clear completed
        </button>
      </footer>
    )
  }
}
