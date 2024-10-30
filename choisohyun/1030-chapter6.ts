// 1
// group, setSelectedBook, param 정보 없음
fetch(window.location.origin + "/data/bookMock.json", {})
    .then((response) => response.json())
    .then((data) => {
        const entire = data.data;
        const length = Object.keys(entire).length;

        for (let i = 0; i < length; i++) {
            if (group === entire[i]["group"]) {
                setSelectedBook(data.data[i].bookList[param]);
            }
        }
    });

// 2
// 함수로 만들기
// group, setSelectedBook, param 정보 없음
async function test1() {
    await fetch(window.location.origin + "/data/bookMock.json", {})
        .then((response) => response.json())
        .then((data) => {
            const entire = data.data;
            const length = Object.keys(entire).length;

            for (let i = 0; i < length; i++) {
                if (group === entire[i]["group"]) {
                    setSelectedBook(data.data[i].bookList[param]);
                }
            }
        });
}

// 3
// 매개변수 추가
async function test1(group, setSelectedBook, param) {
    await fetch(window.location.origin + "/data/bookMock.json", {})
        .then((response) => response.json())
        .then((data) => {
            const entire = data.data;
            const length = Object.keys(entire).length;

            for (let i = 0; i < length; i++) {
                if (group === entire[i]["group"]) {
                    setSelectedBook(data.data[i].bookList[param]);
                }
            }
        });
}

// 4
// 변수 추출하기
async function test1(group, setSelectedBook, param) {
    const bookResponse = await fetch(window.location.origin + "/data/bookMock.json", {})
    const bookData = await bookResponse.json();
    const entire = bookData.data;
    const length = Object.keys(entire).length;

    for (let i = 0; i < length; i++) {
        if (group === entire[i]["group"]) {
            setSelectedBook(entire[i].bookList[param]);
        }
    }
}

// 5
// 함수 선언 바꾸기
async function fetchBook(group, setSelectedBook, param) {
    const bookResponse = await fetch(window.location.origin + "/data/bookMock.json", {})
    const bookData = await bookResponse.json();
    const entire = bookData.data;
    const length = Object.keys(entire).length;

    for (let i = 0; i < length; i++) {
        if (group === entire[i]["group"]) {
            setSelectedBook(entire[i].bookList[param]);
        }
    }
}

// 6
// 함수 추출하기, 변수 인라인하기
async function fetchBook(group, setSelectedBook, param) {
    const bookResponse = await fetch(window.location.origin + "/data/bookMock.json", {})
    const bookData = await bookResponse.json();
    return bookData.data
}
async function findBook(entire, group, setSelectedBook, param) {
    const bookData = await fetchBook(group, setSelectedBook, param);

    for (let i = 0; i < Object.keys(entire).length; i++) {
        if (group === entire[i]["group"]) {
            setSelectedBook(entire[i].bookList[param]);
        }
    }
}

// 7
// 함수 선언 바꾸기
async function fetchBook(group, param) {
    const bookResponse = await fetch(window.location.origin + "/data/bookMock.json")
    const bookData = await bookResponse.json();
    return bookData.data
}
async function findSelectedBooks(group, param) {
    const bookData = await fetchBook(group, param);

    return bookData.map((item) => group === item.group ? item.bookList[param] : null).filter(Boolean)
}
// findSelectedBooks(group, param)