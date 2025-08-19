import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function CommonForm({
  formControls,
  formData,
  setFromData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  // this function is rendering the input field based on the there type
  function renderInputsByComponentType(getControleItem) {
    let element = null;
    const value = formData[getControleItem.name] || "";

    switch (getControleItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControleItem.name}
            placeholder={getControleItem.placeholder}
            id={getControleItem.name}
            type={getControleItem.type}
            value={value}
            onChange={(e) =>
              setFromData({
                ...formData,
                [getControleItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFromData({
                ...formData,
                [getControleItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControleItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControleItem.options && getControleItem.options.length > 0
                ? getControleItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControleItem.name}
            placeholder={getControleItem.placeholder}
            id={getControleItem.name}
            type={getControleItem.type}
            value={value}
            onChange={(e) =>
              setFromData({
                ...formData,
                [getControleItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControleItem.name}
            placeholder={getControleItem.placeholder}
            id={getControleItem.id}
            type={getControleItem.type}
            value={value}
            onChange={(e) =>
              setFromData({
                ...formData,
                [getControleItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controleItem) => (
          <div key={controleItem.name} className="grid w-full gap-1.5">
            <Label>{controleItem.label}</Label>
            {renderInputsByComponentType(controleItem)}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="mt-2 w-full disabled:cursor-not-allowed"
        disabled={isBtnDisabled}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}
export default CommonForm;
