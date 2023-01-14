import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Recommendation = (props) => {
  const currentUser = useQuery(CURRENT_USER);

  // const { data: sortedBooks } = useQuery(ALL_BOOKS, {
  //   skip: !currentUser,
  //   variables: { genre: currentUser.data.me.favouriteGenre },
  // });

  const [getBooks, { loading }] = useLazyQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const books = getBooks({
    variables: { genre: currentUser.data.me.favouriteGenre },
  }).then((response) => response.data);

  console.log(books);

  return (
    <div>
      <h2>recommendations</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {/* {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
