function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), time));
}

interface File {
  name: string;
  body: string;
  size: number;
}

function getFile(name: string): Promise<File> {
  return delay(1000, { name, body: "...", size: 100 });
}

function* take<T>(length: number, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (length-- > 0) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
  }
}

function* chunk<T>(size: number, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    ];
    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

function* map<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>
): IterableIterator<B> {
  for (const a of iterable) {
    yield f(a);
  }
}

async function fromAsync<T>(iterable: Iterable<Promise<T>>) {
  const arr: Awaited<T>[] = [];
  for await (const a of iterable) {
    arr.push(a);
  }
  return arr;
}

async function concurrent_refactor<T>(limit: number, fs: (() => Promise<T>)[]) {
  const result = await fromAsync(
    // 추출 함수 조합: await Promise.all(tmp)
    map(
      (ps) => Promise.all(ps),
      // 추출 함수 조합: for (let i = 0; i < fs.length / limit; i++)
      // for (let j = 0; j < limit; j++)
      map((fs) => fs.map((f) => f()), chunk(limit, fs))
    )
  );

  return result.flat();
}

async function concurrent_origin<T>(limit: number, fs: (() => Promise<T>)[]) {
  const result: T[][] = [];

  // 함수 추출하기 -> chunk
  for (let i = 0; i < fs.length / limit; i++) {
    const tmp: Promise<T>[] = [];

    // 함수 추출하기 -> map
    for (let j = 0; j < limit; j++) {
      const f = fs[i * limit + j];
      if (f) {
        tmp.push(f());
      }
    }

    // 함수 추출하기 -> fromAsync
    result.push(await Promise.all(tmp));
  }
  return result.flat();
}

export async function main() {
  await concurrent_refactor(3, [
    () => getFile("file1.png"),
    () => getFile("file2.pdf"),
    () => getFile("file3.png"),
    () => getFile("file4.ppt"),
    () => getFile("file5.png"),
    () => getFile("file6.ppt"),
    () => getFile("file7.ppt"),
  ]);
}
