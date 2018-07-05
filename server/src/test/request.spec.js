import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import setup from './setup.spec';
import utils from './utils/data';

const { should } = chai;
const { baseUrl } = setup;
should();

chai.use(chaiHttp);
describe('Test request APIs', () => {
  
});
