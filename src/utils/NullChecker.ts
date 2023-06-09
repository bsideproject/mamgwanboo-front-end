
class NullChecker {
  isEmpty = (value : string | object | any[] | undefined) : boolean => {
    if (typeof value === 'string') {
      return !value || value === '""' || value.length === 0;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      return !value || Object.keys(value).length === 0;
    } else if (typeof value === 'object' && Array.isArray(value)) {
      return !value || value.length === 0;
    } else if (typeof value === 'undefined') {
      return true;
    }

    return true;
  }
}

const instance : NullChecker = new NullChecker();

export default instance;