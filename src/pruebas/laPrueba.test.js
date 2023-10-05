import { multi } from "../services/orderDetail.service"

test('multi', () => {
    expect(multi(2, 2)).toBe(4);
});