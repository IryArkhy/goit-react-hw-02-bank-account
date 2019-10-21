const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    throw new Error();
  }
};

const get = key => {
  try {
    const notesFromLS = localStorage.getItem(key);
    return notesFromLS ? JSON.parse(notesFromLS) : null;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export default { save, get };
