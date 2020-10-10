function soma(a, b) {
  return a + b;
}

test('Se a funão soma, recebendo 2 e 3 retorna 5', () => {
  const result = soma(2, 3);

  expect(result).toBe(5);
});
