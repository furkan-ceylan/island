import { mount, shallowMount } from '@vue/test-utils'
import AddImagePost from '@/components/AddImagePost.vue'

describe('AddImagePost.vue', () => {
  it('should add a post', async () => {
    const wrapper = mount(AddImagePost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit')
    expect(wrapper.vm.textDescription).toBe('')
  })

  it('should after adding a post stop the loader', async () => {
    const wrapper = mount(AddImagePost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit')
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('should after adding a post close add text post pop up', async () => {
    const wrapper = mount(AddTextPost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit')
    expect(wrapper.vm.openAddTextPost).toBe(false)
  })
})
