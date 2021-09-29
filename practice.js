/* eslint-disable camelcase */
const Arr = [
  {
    id: 1,
    name: 'hyunseo',
  },
];

const newArray = [
  {
    id: 2,
  },
];

const finall_array = [...newArray, ...Arr];

console.log(finall_array);

finall_array.forEach((object) => {
  console.log(object.id);
});
