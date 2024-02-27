export const SORT_OPTIONS = {
  ALPHABETICAL: 'alphabetical',
  REVERSE_ALPHABETICAL: 'reverseAlphabetical',
  LONGEST: 'longest',
  SHORTEST: 'shortest',
};

export function sortPosts(posts, sort) {
  if (sort === SORT_OPTIONS.ALPHABETICAL) {
    return posts.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sort === SORT_OPTIONS.REVERSE_ALPHABETICAL) {
    return posts.sort((a, b) => b.title.localeCompare(a.title));
  }
  if (sort === SORT_OPTIONS.LONGEST) {
    return posts.sort((a, b) => b.body.length - a.body.length);
  }
  if (sort === SORT_OPTIONS.SHORTEST) {
    return posts.sort((a, b) => a.body.length - b.body.length);
  }
  return posts;
}

export function filterPosts(posts, userId) {
  if (userId) {
    return posts.filter((post) => post.userId === userId);
  }
  return posts;
}

export function searchPosts(posts, search) {
  if (search) {
    const lowerCaseSearch = search.toLowerCase();
    return posts.filter((post) => post.body.toLowerCase().includes(lowerCaseSearch)
    || post.title.toLowerCase().includes(lowerCaseSearch));
  }
  return posts;
}
