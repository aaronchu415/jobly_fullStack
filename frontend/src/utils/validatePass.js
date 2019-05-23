
import JoblyApi from './JoblyApi';

async function validatePass(username, password) {

  try {
    await JoblyApi.request('login', { username, password }, 'post')
    return true
  } catch (e) {
    return false
  }

}

export default validatePass