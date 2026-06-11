"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { EarningsChart } from "@/components/artisan/EarningsChart"
import { TrendingUp, Wallet, ArrowUpRight } from "lucide-react"

const MONTHLY_EARNINGS = 285000
const ALL_TIME_EARNINGS = 1840000

const MOCK_WEEKLY = [
  { day: "Mon", amount: 25000 },
  { day: "Tue", amount: 0 },
  { day: "Wed", amount: 45000 },
  { day: "Thu", amount: 38000 },
  { day: "Fri", amount: 60000 },
  { day: "Sat", amount: 75000 },
  { day: "Sun", amount: 42000 },
]

const MOCK_TRANSACTIONS = [
  {
    id: "t1",
    date: "2024-12-15",
    job_title: "Fix Kitchen Pipe",
    customer: "Kemi Adebayo",
    amount: 15000,
    status: "completed" as const,
  },
  {
    id: "t2",
    date: "2024-12-14",
    job_title: "Install Water Heater",
    customer: "Tunde Johnson",
    amount: 45000,
    status: "completed" as const,
  },
  {
    id: "t3",
    date: "2024-12-12",
    job_title: "Repair Burst Pipe",
    customer: "Grace Obi",
    amount: 12000,
    status: "completed" as const,
  },
  {
    id: "t4",
    date: "2024-12-10",
    job_title: "Bathroom Plumbing",
    customer: "Emeka Eze",
    amount: 38000,
    status: "withdrawn" as const,
  },
  {
    id: "t5",
    date: "2024-12-08",
    job_title: "Kitchen Drain Unblock",
    customer: "Amaka Chidi",
    amount: 8000,
    status: "pending" as const,
  },
]

type TxStatus = "completed" | "withdrawn" | "pending"

const STATUS_CONFIG: Record<
  TxStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  withdrawn: {
    label: "Withdrawn",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
}

export default function EarningsPage() {
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [amount, setAmount] = useState("")

  const handleWithdraw = () => {
    if (!bankName || !accountNumber || !accountName || !amount) {
      toast.error("Please fill in all withdrawal details")
      return
    }
    toast.success(`Withdrawal of ₦${parseFloat(amount).toLocaleString()} initiated!`)
    setWithdrawOpen(false)
    setBankName("")
    setAccountNumber("")
    setAccountName("")
    setAmount("")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your income and manage withdrawals
          </p>
        </div>
        <Button
          onClick={() => setWithdrawOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <ArrowUpRight className="w-4 h-4" />
          Withdraw
        </Button>
      </div>

      {/* Big Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">This Month</p>
            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ₦{MONTHLY_EARNINGS.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-1 font-medium">
            +12% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">All Time</p>
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-4.5 h-4.5 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ₦{ALL_TIME_EARNINGS.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Since you joined</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Weekly Breakdown
        </h2>
        <EarningsChart data={MOCK_WEEKLY} />
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Job
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_TRANSACTIONS.map((tx) => {
                const statusConfig = STATUS_CONFIG[tx.status]
                const formattedDate = new Date(tx.date).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" }
                )
                return (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-gray-500">{formattedDate}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {tx.job_title}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{tx.customer}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900">
                      ₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <Badge className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw Earnings</DialogTitle>
            <DialogDescription>
              Enter your bank details to withdraw your earnings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="bank-name" className="text-sm font-medium mb-1.5 block">
                Bank Name
              </Label>
              <Input
                id="bank-name"
                placeholder="e.g. First Bank of Nigeria"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="account-number" className="text-sm font-medium mb-1.5 block">
                Account Number
              </Label>
              <Input
                id="account-number"
                placeholder="10-digit account number"
                maxLength={10}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="account-name" className="text-sm font-medium mb-1.5 block">
                Account Name
              </Label>
              <Input
                id="account-name"
                placeholder="Account holder name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="withdraw-amount" className="text-sm font-medium mb-1.5 block">
                Amount (₦)
              </Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Enter amount to withdraw"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Available balance: ₦{MONTHLY_EARNINGS.toLocaleString()}
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" onClick={() => setWithdrawOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
