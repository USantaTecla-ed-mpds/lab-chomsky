import  {PersonView}  from './PersonView.js';
import  {Male}  from './Male.js';
import  {Female}  from './Female.js';

const personView = new PersonView();
const male = new Male(5);
personView.show(male);
const female = new Female(6);
personView.show(female);

personView.update(male);
personView.update(female);
personView.show(male);
personView.show(female);

