

export const formatParams = (arr:Array<string>) => {
    const paramsObj: any = {};
    arr.forEach(param => {
        const [key, ...values] = param.split("=");
        paramsObj[key] = values.join("=");
      });
    const formattedJson = JSON.stringify(paramsObj).substring(1, JSON.stringify(paramsObj).length - 1)

    return formattedJson
}