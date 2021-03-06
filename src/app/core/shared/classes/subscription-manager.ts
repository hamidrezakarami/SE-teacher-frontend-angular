import { Directive, OnDestroy } from "@angular/core";
import { SubscriptionLike } from "rxjs";

@Directive()
export class SubscriptionManager implements OnDestroy {
  private _subscriptionList: any = new Map<string, SubscriptionLike>();

  public addSubscription$(
    subscriptionKey: string,
    subscription: SubscriptionLike,
  ) {
    if (this._subscriptionList[subscriptionKey] !== undefined) {
      this._subscriptionList[subscriptionKey].unsubscribe();
      delete this._subscriptionList[subscriptionKey];
    }
    this._subscriptionList[subscriptionKey] = subscription;
  }

  private _unsubscribe(subscriptionKey: string = "") {
    if (subscriptionKey === null) {
      for (let i in this._subscriptionList) {
        if (this._subscriptionList[i] != null) {
          this._deleteSubscription(i);
        }
      }
    } else {
      if (this._subscriptionList[subscriptionKey] != null)
        this._deleteSubscription(subscriptionKey);
      this._subscriptionList[subscriptionKey] = null;
      delete this._subscriptionList[subscriptionKey];
    }
  }

  private _deleteSubscription(subscriptionKey: string) {
    this._subscriptionList[subscriptionKey].unsubscribe();
    delete this._subscriptionList[subscriptionKey];
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }
}
