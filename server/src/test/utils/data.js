const ran = Math.floor(Math.random() * 9);
const ran2 = Math.floor(Math.random() * 8);
const ran3 = Math.floor(Math.random() * 7);
const ran4 = Math.floor(Math.random() * 6);

export default {

  login: {
    existingUser: {
      email: 'maildaniel@gmail.com',
      password: 'dontbescared',
    },

    nonExistingUser: {
      email: 'signupbro@shag.com',
      password: 'nopassaccess',
    },

    wrongData: {
      email: 'a very wrong email'
    }
  },

  noData: {},

  signup: {
    rightDetails: {
      fullName: 'Daniel Adek',
      username: 'DanAdekk',
      email: 'maildaniel.me@gmail.com',
      password: 'dontbescared'
    },

    wrongDetails: {
      fullName: 'eze1',
      username: 'wizi40.',
      email: 'eze1wizi40@gmail',
      password: '419'
    }
  },

  newRide: {
    departure: 'Unilag',
    destination: 'Andela',
    time: `${ran4}${ran2}:${ran3}${ran}`,
    date: `${ran}${ran4}-${ran2}${ran3}-20${ran}${ran2}`,
    seats: 3,
    cost: '$3.0'
  }
};
