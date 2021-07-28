import { mount, shallowMount } from '@vue/test-utils'
import ProfileDetail from '@/components/ProfileDetail'

describe('ProfileDetail', () => {
  it('should increase a follower if user follows a user', async () => {
    const wrapper = mount(ProfileDetail)
    await wrapper.setData({
      followers: 0,
      isSkeletorLoading: false,
      currentUser: false,
      isFollowing: false,
      openEditProfile: false,
    })
    const button = wrapper.find('#btnFollow')

    await button.trigger('click')
    expect(wrapper.vm.followers).toBe(1)
  })

  it('should decrease a follower if user unfollows a user', async () => {
    const wrapper = mount(ProfileDetail)
    await wrapper.setData({
      followers: 1,
      isSkeletorLoading: false,
      currentUser: false,
      isFollowing: true,
      openEditProfile: false,
    })
    const button = wrapper.find('#btnUnfollow')

    await button.trigger('click')
    expect(wrapper.vm.followers).toBe(0)
  })
})
