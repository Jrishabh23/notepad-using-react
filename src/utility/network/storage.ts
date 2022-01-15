export const getData = (id: string) => {
    const response = localStorage.getItem(id);
    if (response) return JSON.parse(response);
    return null;
};

export const setData = (key: string, data: {}) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const saveNoteData = (id: string, data: {}) => {
    let list: any = [];
    const note = localStorage.getItem("note");
    if (note) {
        list = JSON.parse(note);
        list[id] = data;
    } else {
        list = { [id]: data };
    }
    localStorage.setItem("note", JSON.stringify(list));
};

export const getNoteData = (id: string) => {
    let note: any = localStorage.getItem("note");
    if (!note) return [];
    note = JSON.parse(note);
    return note[id] ?? [];
};
/**
 * @desc logout user
 */
export const logoutUser = () => {
    localStorage.removeItem("current");
};
