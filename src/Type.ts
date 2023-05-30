// type을 생성하는 2가지 방법

type MyType = boolean;
type MyType2 = null;

interface MyInterface {
  data: string;
}

const user: KHJ = {
  name: "김효준",
  age: 19,
  live: true,
  gf: true,
};

const myTest: MyType | MyType2 = null;

type Gender = "남" | "여";

interface User {
  name: string;
  age: number;
  live: boolean;
  gender?: Gender;
}

interface KHJ extends User {
  gf: boolean;
}

// ts에서의 type들

type Test =
  | Array<any> //배열<>
  | any[] // <>배열
  | object // {}
  | number // 숫자
  | string // 문자
  | boolean // true | false
  | undefined // undefined
  | null // null
  | any // 만능 (모든게 다 들어갈 수 있음)
  | never // return type이 없거나 type이 없을 때 사용한다
  | void
  | true
  | false;

export {};
