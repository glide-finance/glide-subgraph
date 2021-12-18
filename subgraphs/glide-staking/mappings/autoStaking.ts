import { ManualGlideStaking } from "../generated/schema";
import { Deposit, Withdraw} from "../generated/GlideVault/GlideVault";
import { BigInt } from "@graphprotocol/graph-ts"

export function handleDeposit(event: Deposit): void {
    let entity = ManualGlideStaking.load(event.params.sender.toHex())

    if (!entity) {
        entity = new ManualGlideStaking(event.params.sender.toHex())

        entity.stakeAmount = BigInt.fromI32(0)
    }

    entity.stakeAmount = entity.stakeAmount.plus(event.params.amount)

    entity.save()
}
  
export function handleWithdraw(event: Withdraw): void {
    let entity = ManualGlideStaking.load(event.params.sender.toHex())

    if (!entity) {
        entity = new ManualGlideStaking(event.params.sender.toHex())

        entity.stakeAmount = BigInt.fromI32(0)
    }

    entity.stakeAmount = entity.stakeAmount.minus(event.params.amount)

    entity.save()
}
