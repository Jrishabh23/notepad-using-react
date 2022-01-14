const dateConvertor = (userDate: string): any => {
    console.log({ userDate });
    const today: any = new Date();
    const endDate: any = new Date(userDate);
    console.log(today, typeof today, typeof userDate, userDate, endDate);
    // const days = parseInt((endDate - today) / (1000 * 60 * 60 * 24));
    // const hours = parseInt((Math.abs(endDate - today) / (1000 * 60 * 60)) % 24);
    // const minutes = parseInt(
    //     (Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60)) % 60
    // );
    // const seconds = parseInt(
    //     (Math.abs(endDate.getTime() - today.getTime()) / 1000) % 60
    // );
};

export default dateConvertor;
