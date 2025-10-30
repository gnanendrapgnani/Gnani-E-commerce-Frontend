import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import AdminOrderDetailsView from "./order-details";

const AdminOrderView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Detail</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>27-10-2002</TableCell>
              <TableCell>pending</TableCell>
              <TableCell>799</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailsDialog}
                >
                  <Button onClick = {()=>setOpenDetailsDialog(true)}>View Details</Button>
                  <AdminOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrderView;
