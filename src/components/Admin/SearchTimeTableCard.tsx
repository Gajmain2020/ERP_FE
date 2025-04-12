import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SearchTimeTableCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Time-Table</CardTitle>
        <CardDescription>
          Search the specific semester and section in here to find if the
          time-table for specified semester and section exists or not.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
