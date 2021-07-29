import { mount, shallowMount } from '@vue/test-utils'
import AddTextPost from '@/components/AddTextPost.vue'

describe('AddTextPost.vue', () => {
  it('should add a post', async () => {
    const wrapper = mount(AddTextPost)
    await wrapper.setData({
      textDescription: 'post',
    })
    const button = wrapper.find('#btn-post')
    await button.trigger('submit.prevent')
    expect(wrapper.vm.postingSuccess).toBe('Your post was successfully added!')
  })

  it('should stop the loader after adding a post', async () => {
    const wrapper = mount(AddTextPost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit.prevent')
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('should fill error if user does not enter a post description', async () => {
    const wrapper = mount(AddTextPost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit.prevent')
    expect(wrapper.vm.textDescription).toBe('')
    expect(wrapper.vm.fillError).toBe(true)
  })
})
