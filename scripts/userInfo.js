export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    if (!this._nameElement) {
      console.error(`Element with selector ${nameSelector} not found`);
    }
    if (!this._jobElement) {
      console.error(`Element with selector ${jobSelector} not found`);
    }
    if (!this._avatarElement) {
      console.error(`Element with selector ${avatarSelector} not found`);
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src
    };
  }

  setUserInfo({ name, job, avatar }) {
    if (name && this._nameElement) {
      this._nameElement.textContent = name;
    }
    if (job && this._jobElement) {
      this._jobElement.textContent = job;
    }
    if (avatar && this._avatarElement) {
      this._avatarElement.src = avatar;
    }
  }
}