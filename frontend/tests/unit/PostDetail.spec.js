import { mount, shallowMount } from '@vue/test-utils'
import PostDetail from '@/components/PostDetail.vue'

describe('PostDetail', () => {
  it('should if comment is empty fill the error', async () => {
    const wrapper = mount(PostDetail)
    const button = wrapper.find('button')
    expect(wrapper.vm.commentModel).toBe('')
    await button.trigger('click')
    expect(wrapper.vm.fillError).toBe(false)
  })

  it('should after adding a comment stop the loader', async () => {
    const wrapper = mount(PostDetail)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('should add a comment', async () => {
    const wrapper = mount(PostDetail)
    await wrapper.setData({
      openAddComment: true,
    })
    const input = wrapper.find('[data-test="comment"]')
    await input.setValue('Test Comment')
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.vm.commentModel).toBe('Test Comment')
  })
})
