async function increaseOneInRequestTimes(user: any) {
    user.requestTimes = user.requestTimes + 1;
    user.save()
}

export default increaseOneInRequestTimes;