/**
 * This helps include other HTML files
 * 
 * @param {string} id Section HTML ID
 */
const includer = (id) => {
    const content = document.getElementById(id);
    const endPoint = '/includes/' + id + '.html';

    fetch(endPoint)
        .then(res => res.text())
        .then(data => {
            content.innerHTML = data;

            // code above works for HTML and CSS only. Below for JS
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // get and excute any scripts code if they are found
            const js = doc.querySelector('script');
            if (js) {
                eval(js.textContent);
            }
        })
};
