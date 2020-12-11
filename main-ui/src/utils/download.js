

export default (url, name) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = url;
  link.click();
}
