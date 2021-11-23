import { Payment } from 'src/app/banker/payment';
import { PaymentLogComponent } from './payment-log.component';

describe('PaymentLogComponentTest', () => {
  it('Should add payments', () => {
    const component = new PaymentLogComponent(null, null);
    const payment = {} as Payment;

    expect(component.payments.length).toBe(0);

    component.addToLog({} as Payment);
    component.addToLog(payment);
    expect(component.payments[0]).toBe(payment);

    component.addToLog({} as Payment);
    component.addToLog({} as Payment);
    expect(component.payments.length).toBe(3);
  });
});
