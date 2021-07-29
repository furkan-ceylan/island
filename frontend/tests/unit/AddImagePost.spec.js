import { mount, shallowMount } from '@vue/test-utils'
import AddImagePost from '@/components/AddImagePost.vue'

describe('AddImagePost.vue', () => {
  it('should add a post', async () => {
    const wrapper = mount(AddImagePost)
    await wrapper.setData({
      textDescription: 'post',
      file: 'post.jpg',
    })
    const button = wrapper.find('#btn-post')
    await button.trigger('submit.prevent')
    expect(wrapper.vm.postingSuccess).toBe('Your post was successfully added!')
  })

  it('should stop the loader after adding a post', async () => {
    const wrapper = mount(AddImagePost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit.prevent')
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('should fill error if user does not enter a post description', async () => {
    const wrapper = mount(AddImagePost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit.prevent')
    expect(wrapper.vm.textDescription).toBe('')
    expect(wrapper.vm.fillError).toBe(true)
  })
})
