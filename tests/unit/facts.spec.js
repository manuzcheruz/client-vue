import { mount, flushPromises, MountingOptions } from '@vue/test-utils';
import Facts from '@/components/Facts.vue';
import * as axios from 'axios';

const mockFact = [
  {
    id: 2,
    username: "5a9ac18c7478810ea6c06381",
    textdescription: "this is the first",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  },
  {
    id: 3,
    username: "6a9ac18c7478810ea6c06381",
    textdescription: "this is the second",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  }
];

const mockFactUpdate = [
  {
    id: 2,
    username: "5a9ac18c7478810ea6c06381",
    textdescription: "this has been updated",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  },
  {
    id: 3,
    username: "6a9ac18c7478810ea6c06381",
    textdescription: "this is the second",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  }
]

const mockFactDelete = [
  {
    id: 2,
    username: "5a9ac18c7478810ea6c06381",
    textdescription: "this has been updated",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  }
]

window.alert = jest.fn();
jest.mock('axios');
// jest.mock('axios', () => ({
//   get: jest.fn(() => mockFact),
//   put: jest.fn(() => mockFactUpdate)
// }))

// const mockPostList = [
//   { id: 1, title: 'title1' },
//   { id: 2, title: 'title2' }
// ]

// // Following lines tell Jest to mock any call to `axios.get`
// // and to return `mockPostList` instead
// jest.mock('axios', () => ({
//   get: jest.fn(() => mockPostList)
// }))

// test('loads posts on button click', async () => {
//   const wrapper = mount(Facts)

//   await wrapper.get('#cli').trigger('click')

//   // Let's assert that we've called axios.get the right amount of times and
//   // with the right parameters.
//   expect(axios.get).toHaveBeenCalledWith('/api/posts')

//   // Wait until the DOM updates.
//   await flushPromises()

//   // Finally, we make sure we've rendered the content from the API.
//   // const posts = wrapper.findAll('[data-test="post"]')

//   // expect(posts).toHaveLength(2)
//   expect(wrapper.vm.posts).toHaveLength(2)
//   expect(wrapper.html()).toMatchSnapshot();
//   // expect(posts[0].text()).toContain('title1')
//   // expect(posts[1].text()).toContain('title2')
// })

test('does the wrapper exist', async () => {
  const wrapper = mount(Facts);
  expect(wrapper.exists()).toBe(true)
})

test('render a fact', async () => {
  const wrapper = mount(Facts);

  console.log(wrapper.vm);
  axios.get.mockResolvedValue({ data: [
  {
    id: 2,
    username: "5a9ac18c7478810ea6c06381",
    textdescription: "this is the first",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  },
  {
    id: 3,
    username: "6a9ac18c7478810ea6c06381",
    textdescription: "this is the second",
    updatedat: "2022-01-23T21:00:00.000Z",
    animaltype: "cat",
    createdat: "2018-02-26T21:00:00.000Z"
  }
  ]});

  await wrapper.get('#cli').trigger('click');

  await flushPromises();

  expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/cat/fromSource');

  await flushPromises();

  expect(wrapper.vm.facts.data).toHaveLength(2);
  // window.alert.mockClear();
})

// test('should call updateHandler when update is clicked', async () => {
//   const wrapper = mount(Facts);

//   axios.put.mockResolvedValue({ data: [
//   {
//     id: 2,
//     username: "5a9ac18c7478810ea6c06381",
//     textdescription: "this is the first",
//     updatedat: "2022-01-23T21:00:00.000Z",
//     animaltype: "cat",
//     createdat: "2018-02-26T21:00:00.000Z"
//   },
//   {
//     id: 3,
//     username: "6a9ac18c7478810ea6c06381",
//     textdescription: "this is the second",
//     updatedat: "2022-01-23T21:00:00.000Z",
//     animaltype: "cat",
//     createdat: "2018-02-26T21:00:00.000Z"
//   }
//   ]
//   });
  
//   await wrapper.get('#update').trigger('click');

//   expect(axios.put).toHaveBeenCalled();

//   await flushPromises();

//   expect(wrapper.vm.facts.data).toHaveLength(2);
// })

// test('should call deleteHandler when delete is clicked', async () => {
//   const wrapper = mount(Facts);

//   await wrapper.get('#delete').trigger('click');

//   expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/cat/facts/3');

//   await flushPromises();
//   await expect(wrapper.html()).toMatchSnapshot();
//   // expect(wrapper.vm.facts).toHaveLength(1);
// })
