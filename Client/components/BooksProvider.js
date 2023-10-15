import * as React from 'react';

const BooksContext = React.createContext();

export function UseBooksContext() {
    return React.useContext(BooksContext);
}

function BooksProvider({children}) {
    const [books, setBooks] = React.useState([]);

    return (
        <BooksContext.Provider value={{books, setBooks}}>
            {children}
        </BooksContext.Provider>
    )
}

export default BooksProvider;