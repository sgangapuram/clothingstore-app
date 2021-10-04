import React from 'react';

export default function Pagination({gotoNextPage, gotoPrevPage}) {
    return (<div>
        {gotoPrevPage && <button onClick={gotoPrevPage}>PrevPage</button>}
        {gotoNextPage && <button onClick={gotoNextPage}>NextPage</button>}
        </div>)
}
