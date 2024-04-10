import React from 'react';

export function About() {
    const [imageUrl, setImageUrl] = React.useState('');
    const [quote, setQuote] = React.useState('');
    const [quoteAuthor, setQuoteAuthor] = React.useState('');

    React.useEffect(() => {
        const random = Math.floor(Math.random() * 1000);
        fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
        .then((response) => response.json())
        .then((data) => {
          const containerEl = document.querySelector('#picture');
    
          const width = containerEl.offsetWidth;
          const height = containerEl.offsetHeight;
          const imgUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}`;
          setImageUrl(imgUrl);
        })
        .catch();

        fetch('https://api.quotable.io/random')
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.content);
                setQuoteAuthor(data.author);
            })
            .catch();
    }, []);

    let imageEl = '';

    if (imageUrl) {
      imageEl = <img src={imageUrl} alt='image of something amazing' />;
    }

    return (
    <main className="about">
        <p>This website allows you to quickly make and publish surveys.</p>
        <p>Hopefully it works!</p>
        <div id="picture" className="picture-box">{imageEl}</div>
        <div id="quote_box">
            <p className='quote'>{quote}</p>
            <p className='author'>{quoteAuthor}</p>
        </div>
    </main>
    ) 
}