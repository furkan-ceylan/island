import { mount, shallowMount } from '@vue/test-utils'
import ProfileDetail from '@/components/ProfileDetail.vue'
import PostDetail from '@/components/PostDetail.vue'

describe('ProfileDetail.vue', () => {
  it('increment followers by 1', async () => {
    const wrapper = mount(ProfileDetail)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.html()).toContaion(2)
  })

  it('decrement followers by 1', async () => {
    const wrapper = mount(ProfileDetail)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.html()).toContain(0)
  })
})

describe('PostDetail.vue', () => {
  it('renders post for each item in posts', () => {
    const posts = ['1', '2']
    const wrapper = shallowMount(PostDetail)
    expect(wrapper.findAll('post')).toHaveLength(posts.length)
  })

  it('matches snapshot', () => {
    const posts = ['post 1', 'post 2']
    const wrapper = shallowMount(PostDetail)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
