import { useQuery, useMutation } from '@tanstack/react-query';

interface IPost {
  id: number | string;
  title: string;
}

const POSTS: Array<IPost> = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
];

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

function App() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title })),
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  console.log(POSTS);
  return (
    <div>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button onClick={() => newPostMutation.mutate('New Post')}>Add New</button>
    </div>
  );
}

export default App;
