import { mount, shallowMount } from '@vue/test-utils'
import AddTextPost from '@/components/AddTextPost.vue'

describe('AddTextPost.vue', () => {
  it('should add a post', async () => {
    const wrapper = mount(AddTextPost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit')
    expect(wrapper.vm.postingSuccess).toContain(
      'Your post was successfully added!'
    )
  })

  it('should stop the loader after adding a post', async () => {
    const wrapper = mount(AddTextPost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit')
    expect(wrapper.vm.isLoading).toEqual(false)
  })

  it('should close add text post pop up after adding a post', async () => {
    const wrapper = mount(AddTextPost)
    const button = wrapper.find('#btn-post')
    await button.trigger('submit')
    expect(wrapper.vm.openAddPost).toBe(false)
  })
})
