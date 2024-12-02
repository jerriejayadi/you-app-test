const useCookies = () => {
  const getCookie = (cookieName: string) => {
    if (typeof document !== "undefined") {
      const cookie = document.cookie.match(
        `(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`
      );
      return cookie ? decodeURIComponent(cookie.pop() as string) : "";
    }
    return "";
  };

  const setCookie = (
    cookieName: string,
    value: any,
    expires = 0,
    path = "/"
  ) => {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    const expiresString = expires ? `expires=${date.toUTCString()};` : "";
    document.cookie = `${cookieName}=${encodeURIComponent(
      value
    )};${expiresString}path=${path};`;
  };

  const removeCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=;`;
  };

  return { getCookie, setCookie, removeCookie };
};

export default useCookies;
